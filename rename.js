const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

async function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function processPromisesBatch(items, limit, fn) {
    let results = []
    for (let start = 0; start < items.length; start += limit) {
        const end = start + limit > items.length ? items.length : start + limit

        const slicedResults = await Promise.all(items.slice(start, end).map(fn))

        results = [...results, ...slicedResults]
    }

    return results
}

const directoryPath = process.argv[2]
const files = fs.readdirSync(directoryPath, { withFileTypes: true, recursive: true })

const paths = files.filter((x) => x.name.endsWith('16.wav')).map((x) => x.path + x.name)

async function Rename(filePath) {
    const mainDir = 'E:\\hellextractor\\whisper-cublas-12.2.0-bin-x64'
    const outputFile = 'E:\\hellextractor\\audio\\names.txt'

    const fileName = path.basename(filePath)
    const fileID = fileName.split('.')[0]

    const namesContent = fs.readFileSync(outputFile, 'utf8')
    if (namesContent.includes(fileID)) {
        console.log(
            `${fileID}, Skipped; Percent of total: ${((paths.indexOf(filePath) / paths.length) * 100).toFixed(2)}%`
        )

        return
    }

    let result
    try {
        result = execSync(
            `${path.join(mainDir, 'main.exe')} -m "${path.join(
                mainDir,
                'models',
                'ggml-base.en.bin'
            )}" -l en -f "${filePath}" -nt`,
            {
                stdio: 'pipe'
            }
        )
            .toString()
            .trim()
    } catch (error) {
        console.error('Error executing main.exe:', error)
        process.exit(1)
    }

    result = result.replace(/;/g, '')

    fs.appendFileSync(outputFile, `${fileID};${result}\n`)

    console.log(
        `${fileID}, Done; Percent of total: ${((paths.indexOf(filePath) / paths.length) * 100).toFixed(
            2
        )}% ${paths.indexOf(filePath)} of ${paths.length}`
    )

    await timeout(500)
}

processPromisesBatch(paths, 16, Rename)
