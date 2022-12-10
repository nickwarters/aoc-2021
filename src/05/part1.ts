import { readFileSync } from 'fs'

function solve(input: string): any {
    const max = input.match(/(\d{1,})/g)!.map(x => parseInt(x)).sort((a, b) => b-a)[0]
    const grid = new Array(max * max)
    const lines = input.split('\n')
    const getIndex = (row: number, col: number) => row * max + col 

    let sR = 0, sC = 0, eR = 0, eC = 0

    for(let i = 0; i < lines.length; i++){
        if(lines[i] === '') continue; 

        [sC, sR, eC, eR] = lines[i].match(/(\d{1,})/g)?.map(x => parseInt(x))!
        if(sC !== eC && sR !== eR) continue
        let r = 0 
        let c = 0
        let ind = 0 
        for(r = Math.min(sR, eR); r < Math.max(sR, eR) + 1; r++){
            for(c = Math.min(sC, eC); c < Math.max(sC, eC) + 1; c++){
                ind = getIndex(r, c)
                console.log(`setting index: ${ind} for [${r},${c}] to ${grid[ind] === undefined ? 1 : grid[ind] + 1}`)
                grid[ind] = grid[ind] === undefined ? 1 : grid[ind] += 1 
            }

        }

    }
    
    

    return grid.filter(a => a !== undefined && a >= 2).length 
}

const tests: [string, any][] = [[`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, 5]]

tests.forEach(([testData, expected]) => {
	const result = solve(testData)
	console.log(
		`Example Input Solution - Expected: ${expected}, Got: ${result}, ${
			result === expected ? 'PASS' : 'FAIL'
		}`
	)
})

console.log(
	'Full Input Solution',
	solve(readFileSync('./input.txt', { encoding: 'utf-8' }))
)
