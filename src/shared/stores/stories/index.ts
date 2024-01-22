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

    const currentStoryId: Ref<string | null> = ref(null);

    const setParticipantsToCurrentStory = (
        storyId: string,
        participants: {
            id: string,
            username: string,
            result: number,
            isVoted: boolean,
        }[]): void => {
        const foundStory = _stories.value.find((item) => item.id === storyId);

        if (foundStory) {
            foundStory.participants = participants;
        }
    }

    const setStatusStore = (storyId: string, status: string): void => {
        const foundStory = _stories.value.find((item) => item.id === storyId);

        if (foundStory) {
            foundStory.status = status;
        }
    }

    const vote = (storyId: string, userId: string, isVote: boolean, result: number): void => {
        const foundStory = stories.value.find((item) => item.id === storyId);

        if (foundStory && foundStory.participants) {
            const participant = foundStory.participants
                .find((item) => item.id === userId);

            if (participant) {
                participant.isVoted = isVote;
                participant.result = result;
            }
        }
    }

    return {
        stories,
        addNewStory,
        setStories,
        setParticipantsToCurrentStory,
        vote,
        setStatusStore,
        currentStoryId,
    }
});

export default useStoriesStore;