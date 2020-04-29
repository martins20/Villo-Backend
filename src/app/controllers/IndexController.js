class IndexController {
    index(req, res) {
        console.log('Tudo Funcionando certinho')
        res.json('ok')
    }
}

export default new IndexController()
