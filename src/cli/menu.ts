import readline from "readline-sync"
import downloader from "./functions/downloader"
import musicplayer from "./functions/audioDownloader"

export default async function menu() {
    console.log(`[1] Download music`)
    console.log(`[2] Music player...`)

    while (true) {
        let action = readline.question("Action: ")

        if (action == "1") {
            let keyword = readline.question("Keyword: ")
            await downloader(keyword)
        }

        if (action =="2") {
            // await musicplayer()
        }

    }
}