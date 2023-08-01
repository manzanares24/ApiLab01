const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Mp.Id, Fecha, CASE WHEN Disponibilidad = 1 THEN "DISPONIBLE" ELSE "EN USO" END Disponibilidad,Descipcion, IdPila, IdPersonal FROM mantenimientopila AS Mp INNER JOIN personal AS P ON Mp.IdPila = P.Id INNER JOIN pilas AS Pi ON Mp.IdPila = Pi.Id', (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Mp.Id, Fecha, CASE WHEN Disponibilidad = 1 THEN "DISPONIBLE" ELSE "EN USO" END Disponibilidad,Descipcion, IdPila, IdPersonal FROM mantenimientopila AS Mp INNER JOIN personal AS P ON Mp.IdPila = P.Id INNER JOIN pilas AS Pi ON Mp.IdPila = Pi.Id WHERE Mp.Id = ?', [req.params.id],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})


routes.post('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('INSERT INTO mantenimientopila set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Mantenimiento Pila Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE mantenimientopila SET Disponibilidad = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Mantenimiento Pila Eliminado')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE mantenimientopila set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Mantenimiento Pila Actualizado')
        })
    })
})


module.exports = routes