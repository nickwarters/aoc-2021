import { readFileSync } from 'fs'

function solve(input: string): any {
    const spawned = new Array()
    const current = input.split(',').map(x => parseInt(x))

    const days = 256
    const cycle = 6
    const spawnCycle = 8

    let f = 0
    let spawnCount = 0 
    let moveCount = 0 
    for(let d = 0; d < days; d++){
        spawnCount = 0 
        moveCount = 0 
        for(f = 0; f < current.length; f++){
            if(current[f] === 0){
                current[f] = cycle 
                spawnCount += 1  
            } else {
                current[f] -= 1 
            }
        }

        for(f = 0; f < spawned.length; f++){
            if(spawned[f] === 0){
                moveCount++
                spawnCount++
                current.push(cycle)
            } else {
                spawned[f] -= 1 
            }
        }

        while(spawnCount){
            spawned.push(spawnCycle)
            spawnCount--
        }

        while(moveCount){
            spawned.shift()
            moveCount--
        }

        console.log(`Completed day: ${d+1}`)

        //if(d < 20){
        //    console.log(`After ${d+1} days: ${current.join(',')} -- ${spawned.join(',')}`)
        //}
    }

    return current.length + spawned.length
}

const tests: [string, any][] = [[`3,4,3,1,2`, 5934]]

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
