<script setup lang="ts">
import { Ref, ref } from 'vue';
import { updateActiveSessionParticipants } from 'src/entities/team/session-team/api';
import { storeToRefs } from 'pinia';
import { useCommonStore } from 'src/shared/stores';

const props = defineProps<{
    sessionId: string,
    participants: {
        id: string,
        teamName: string,
        username: string,
        isActive: boolean,
    }[],
}>();

const { isGlobalLoading } = storeToRefs(useCommonStore());

const isEditModalOpen = ref(false);

const internalParticipants: Ref<{
    id: string,
    teamName: string,
    username: string,
    isActive: boolean,
}[]> = ref(props.participants);

const onUpdateActiveSessionParticipants = async (): Promise<void> => {
    isGlobalLoading.value = true;
    await updateActiveSessionParticipants(props.sessionId, internalParticipants.value);
    internalParticipants.value = props.participants;
    isGlobalLoading.value = false;
    isEditModalOpen.value = false;
}

</script>

<template>
  <v-card class="session-team">
    <div class="session-team__title">Team</div>
    <div class="session-team__content">
      <div class="session-team__name">
        {{ participants[0]?.teamName }}
      </div>
      <v-btn
        density="compact"
        style="font-size: 10px;"
        color="blue-accent-4"
        @click="isEditModalOpen = true"
      >
        Edit
      </v-btn>
    </div>
    <v-dialog
      v-model="isEditModalOpen"
      persistent
    >
      <v-card class="session-team-edit">
        <div class="session-team-edit__title">
          <div>Edit team</div>
          <v-btn
            density="compact"
            variant="flat"
            icon
            @click="isEditModalOpen = false"
          >
            <v-icon icon="mdi mdi-close" />
          </v-btn>
        </div>
        <div
          v-for="item in internalParticipants"
          :key="item.id"
          class="session-team-edit__item"
        >
          <v-checkbox
            v-model="item.isActive"
            :label="item.username"
            density="compact"
            color="blue-accent-4"
            hide-details
          />
        </div>
        <div class="session-team-edit__active">
          <v-btn
            density="compact"
            style="font-size: 10px;"
            color="black"
            class="mr-4"
            @click="isEditModalOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn
            density="compact"
            style="font-size: 10px;"
            color="blue-accent-4"
            @click="onUpdateActiveSessionParticipants"
          >
            Apply
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style lang="scss" scoped>
.session-team {
  padding: 1rem;
  height: 100%;

  &__title {
    font-size: 13px;
    font-weight: bold;
    color: grey;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.session-team-edit {
  padding: 1rem;
  width: 400px;
  margin: 0 auto;

  &__title {
    margin-bottom: 1rem;
    font-weight: bolder;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    align-items: center;
  }

  &__active {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 1rem;
  }
}

.v-input--density-compact {
  --v-input-control-height: 30px;
  --v-input-padding-top: 8px;
}
</style>