import { Router, Request, Response } from 'express'

const router = Router()

import Player from '../models/Player'

router.route('/create')
  .get((req: Request, res: Response) => {
    res.render('players/create')
  })
  .post( async (req: Request, res: Response) => {
    const { name, alias, email } = req.body
    const newPlayer = new Player({ name, alias, email })
    await newPlayer.save()
    res.redirect('/players/list')
  })

router.route('/list')
  .get( async (req: Request, res: Response) => {
    const players = await Player.find({}, {
      limit: 10,
      
    })
    console.log(players)
    res.render('players/list',  {players} )
  })

router.route('/delete/:id')
  .get( async (req: Request, res: Response) => {
    const { id } = req.params
    await Player.findByIdAndDelete(id)
    res.redirect('/players/list')
  })

router.route('/edit/:id')
  .get( async (req: Request, res: Response) => {
    const { id } = req.params
    const player = await Player.findById(id)
    console.log(player)
    res.render('players/edit', { player })
  })
  .post( async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, alias, email } = req.body
    await Player.findByIdAndUpdate(id, {name, alias, email})
    res.redirect('/players/list')
  })

export default router