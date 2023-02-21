/**
 * returns CLI arguments as key value pairs
 * @returns {object} CLI args as key value pairs
 */
export default function getParsedArgs () {
    const [,, ...args] = process.argv
    const argEntries = args.map((arg)=>{
        return arg.split("=")
    })
    return Object.fromEntries(argEntries)
}
