export const Questions = [
    "What is your monthly electric bill?",
    "What is your monthly gas bill?",
    "What is your monthly oil bill?",
    "How many miles have you driven this year?",
    "How many flights (< 4 hours) have you taken this year",
    "How many flights (> 4 hours) have you taken this year",
    "Do you recycle paper?",
    "Do you recycle aluminum and tin ?",
]

export const AddQuestions = [

    {
        text: "Are batteries safetly disposable in ....",
        options: [
            { id: 0, text: "A: Recycle bin", isCorrect: false },
            { id: 1, text: "B: Waste Bin", isCorrect: false },
            { id: 2, text: "Option A and B", isCorrect: false },
            { id: 3, text: "Neither", isCorrect: true },
        ],
    },
    {
        text: "Which of the following can you not recycle?",
        options: [
            { id: 0, text: "Shredded Paper", isCorrect: true },
            { id: 1, text: "Cardboard", isCorrect: false },
            { id: 2, text: "Mail", isCorrect: false },
            { id: 3, text: "Glass Jars", isCorrect: false },
        ],
    },
    {
        text: "Which of the following can you recycle?",
        options: [
            { id: 0, text: "Crayons", isCorrect: true },
            { id: 1, text: "Metal", isCorrect: false },
            { id: 2, text: "Plastic Bottle Caps", isCorrect: false },
            { id: 3, text: "Rubber", isCorrect: false },
        ],
    },
    {
        text: "If you're unsure if a product is recyclable, you should...",
        options: [
            { id: 0, text: "Throw it into the recycle bin", isCorrect: false },
            { id: 1, text: "Do not curbside recycle,call an nearby center", isCorrect: true },
            { id: 2, text: "Clean the product and place it in a bag prior to recycling", isCorrect: false },
            { id: 3, text: "Remove any caps or lid before placing it into the recycling bin", isCorrect: false },
        ],
    },
    {
        text: "Which Item would you place in the recycle bin",
        options: [
            {id: 0, text: "Holiday lights!", isCorrect: false},
            {id: 1, text: "milk jugs in a plastic bag", isCorrect: true},
            {id: 2, text: "Ceramic jars", isCorrect: false},
            {id: 3, text: "None of the above", isCorrect: true},
        ],
    },
    {
        text: "Most common recyclable items in the US are ....",
        options: [
            { id: 0, text: "Glass", isCorrect: false },
            { id: 1, text: "Paper and Cardboard", isCorrect: false },
            { id: 2, text: "Steel, tin, and aluminum cans", isCorrect: false },
            { id: 3, text: "All of the above", isCorrect: true },
        ],
    },
    {
        text: "Why  are paper towels, napkins and tissues not recyclable?",
        options: [
            { id: 0, text: "Their fabric fibers are shorten", isCorrect: false },
            { id: 1, text: "They are covered in food or chemicals ", isCorrect: false },
            { id: 2, text: "They already have been recycled", isCorrect: false },
            { id: 3, text: "All of the above", isCorrect: true },
        ],
    },
    {
        text: "If an Item is recyclable from a nearby recycling center, you can",
        options: [
            { id: 0, text: "Place it into your recycling bin", isCorrect: false },
            { id: 1, text: "Leave a note for curbside recycling team", isCorrect: false },
            { id: 2, text: "Place it into you're neighbor's recycling bin", isCorrect: false },
            { id: 3, text: "Recycle the item by the recycling center's recommendation", isCorrect: true },
        ],
    },

]

