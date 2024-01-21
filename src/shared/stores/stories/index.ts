import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { setParticipantsToStory } from 'src/widgets/current-story/api';

type StoryParticipants = {
    id: string,
    username: string,
    result: number,
    isVoted: boolean,
}

type Story = {
    id: string,
    text: string,
    link?: string,
    status: string,
    estimation: number,
    totalTime: number,
    participants?: StoryParticipants[],
}

const useStoriesStore = defineStore('stories', () => {
    const _stories: Ref<Story[]> = ref([]);

    const stories = computed(() => _stories.value);

    const setStories = (s: Story[]): void => {
        _stories.value = s;
    }

    const addNewStory = (newStory: Story): void => {
        _stories.value.push(newStory);
    }

    const _currentStory: Ref<Story | undefined> = ref(undefined);

    const currentStory = computed(() => _currentStory.value);

    const setParticipantsToCurrentStory = (participants: {
        id: string,
        username: string,
        result: number,
        isVoted: boolean,
    }[]): void => {
        _currentStory.value!.participants = participants;
    }

    const setStatusStore = (status: string): void => {
        if (_currentStory.value) {
            _currentStory.value.status = status;
        }
    }

    const vote = (userId: string, isVote: boolean, result: number): void => {
        if (_currentStory.value && _currentStory.value?.participants) {
            const participant = _currentStory.value.participants
                .find((item) => item.id === userId);

            if (participant) {
                participant.isVoted = isVote;
                participant.result = result;
            }
        }
    }

    const selectCurrentStory = (id: string): void => {
        _currentStory.value = _stories.value.find((s) => s.id === id);
    }

    return {
        stories,
        addNewStory,
        currentStory,
        selectCurrentStory,
        setStories,
        setParticipantsToCurrentStory,
        vote,
        setStatusStore,
    }
});

export default useStoriesStore;