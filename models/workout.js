const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    excercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Please enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Please enter name"
            },
            duration: {
                type: Number,
                required: "Please enter duration"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
