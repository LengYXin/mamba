import { AjaxBasics } from '../../'
it('test', async () => {
    // console.log("LENG: process.env", process.env.NODE_ENV)
    const res = await new AjaxBasics({ target: 'https://api.github.com/' }).get('/emojis?a={a}&b={b}', { a: 1, b: 2 });
    console.log("TCL: res", JSON.stringify(res, null, 4))
})