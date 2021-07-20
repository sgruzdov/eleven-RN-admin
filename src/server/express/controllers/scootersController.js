const ScooterModel = require('../../mongo/models/Scooter')


class scootersController {
    async getScooters(req, res) {
        try {
            const result = await ScooterModel.find(JSON.parse(req.query[0]))
            res.json(result)
        } catch(e) {
            console.log(e)
            res.status(400).json('Ошибка получения данных')
        }
    }

    async changeStatusActive(req, res) {
        try {
            const { id, status } = req.body
            const result = await ScooterModel.updateOne({scooterId: id}, {active: status})

            if(result.n !== 1) {
                return res.status(400).json('Ошибка изменения состояния')
            } else {
                const findSelectedScooter = await ScooterModel.findOne({scooterId: id})
                
                if(findSelectedScooter === null) {
                    return res.status(400).send('Ошибка изменения состояния')
                }

                res.send(findSelectedScooter)
            }

        } catch (e) {
            console.log(e)
            res.status(400).json('Ошибка изменения состояния')
        }
    }
    
    async getScootersPagination(req, res) {
            const { skip, size } = req.query
        try {
            const data = await ScooterModel.find({}).skip(+skip).limit(+size)
            const count = await ScooterModel.countDocuments()
            return res.send({data, count})            
        } catch (e) {
            console.log(e)
            res.status(400).json('Ошибка получения данных')
        }
    }


    // async addScooter(req, res) {
    //     const getRandomIntInclusive = (min, max) => {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         return Math.floor(Math.random() * (max - min + 1)) + min; 
    //     }
    
    //     const getRandomIntInclusive2 = (min, max) => {
    //         return Math.random() * (max - min) + min; 
    //     }
    
    //     for(let i = 0; i < 100; i++) {
    //         let scooter = new ScooterModel({
    //             scooterId: getRandomIntInclusive(100000, 999999),
    //             location: {
    //                 latitude: getRandomIntInclusive2(53.832952424813264, 53.96976226289491),
    //                 longitude: getRandomIntInclusive2(27.407319029893802, 27.68970102456448),
    //             },
    //             charge: getRandomIntInclusive(0, 100),
    //             active: Math.random() > 0.8,
    //             userActive: Math.random() < 0.3,
    //             breakdown: Math.random() < 0.1,
    //         })
    //         await scooter.save()
    //     }
    // }
}

module.exports = new scootersController()