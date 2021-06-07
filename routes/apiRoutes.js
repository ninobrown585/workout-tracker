const router = require('express').Router();
const Workouts = require('../models/workout.js');

router.post("/api/workouts", (req, res) => {
    console.log(res);
    Workouts.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/api/workouts/:id', ({body, params}, res) => {
    console.log(res);
    Workouts.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    ).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    console.log(res);
    Workouts.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
    .then(
        (dbWorkout) => {
            res.json(dbWorkout)
        }
    )
    .catch((err) => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    console.log(res);
    Workouts.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
     .sort({id: -1})
      .limit(7)
    .then(
        (dbWorkout) => {
            res.json(dbWorkout);
        }
    ).catch((err) => {
        res.json(err);
    });
});

router.delete("/api/workouts", ({body}, res) => {
    console.log(res);
    Workouts.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true)
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;