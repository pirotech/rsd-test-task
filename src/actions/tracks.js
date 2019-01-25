let mockApiData = [
    {
        id: 1,
        name: "Enter Sandman"
    },
    {
        id: 2,
        name: "Welcome Home"
    },
    {
        id: 3,
        name: "Into the black"
    },
    {
        id: 4,
        name: "We are"
    },
    {
        id: 5,
        name: "New Day"
    },
];

export const getTracks = () => dispatch => {
    setTimeout(() => {
        console.log("I got tracks");
        dispatch({type: "FETCH_TRACKS_SUCCESS", payload: mockApiData});
    }, 2000);
};