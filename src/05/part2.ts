import { readFileSync } from 'fs'

function solve(input: string): any {
    const max = input.match(/(\d{1,})/g)!.map(x => parseInt(x)).sort((a, b) => b-a)[0]
    const grid = new Array(max * max)
    const lines = input.split('\n')
    const getIndex = (row: number, col: number) => row * max + col 

    let r1 = 0, c1 = 0, r2 = 0, c2 = 0

    for(let i = 0; i < lines.length; i++){
        if(lines[i] === '') continue; 

        [c1, r1, c2, r2] = lines[i].match(/(\d{1,})/g)?.map(x => parseInt(x))!
//        if(sC !== eC && sR !== eR) continue
        let r = 0 
        let c = 0
        let ind = 0
        let rd = 0 
        let cd = 0 

        if(c2 > c1){
            cd = 1 
        } else if (c1 > c2){
            cd = -1
        }
        if(r2 > r1){
            rd = 1 
        } else if (r1 > r2){
            rd = -1
        }
        
        r = r1 
        c = c1 

        while (`${r},${c}` !== `${r2},${c2}`){
            ind = getIndex(r, c)
            //console.log(`setting index: ${ind} for [${r},${c}] to ${grid[ind] === undefined ? 1 : grid[ind] + 1}`)
            grid[ind] = grid[ind] === undefined ? 1 : grid[ind] += 1 
            
            r += rd 
            c += cd
        }
        ind = getIndex(r, c)
        //console.log(`setting index: ${ind} for [${r},${c}] to ${grid[ind] === undefined ? 1 : grid[ind] + 1}`)
        grid[ind] = grid[ind] === undefined ? 1 : grid[ind] += 1 

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
5,5 -> 8,2`, 12]]

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
