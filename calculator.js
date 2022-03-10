const display = document.querySelector('.result')
const keys = document.querySelector('.keys')
const clear = document.querySelector('.clear')
const calculator  = document.querySelector('.calculator')

function calculate (n1, operator, n2){
    let num1 = parseFloat(n1)
    let num2 = parseFloat(n2)
    //using parseFloat instead of parseInt so we can sum decimals
    if (operator==='add'){return num1+num2}
    if (operator==='subtract'){return num1-num2}
    if (operator==='multiply'){ return num1*num2}
    if (operator==='divide'){return num1/num2}
}

keys.addEventListener('click', (e)=>{
    if(e.target.matches('button')){
        const key = e.target
        let action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent //when outside of function, number resets every time
        
        if(!action){
            if(displayedNum==='0' || calculator.dataset.previousKeyType==='operator' || calculator.dataset.previousKeyType==='calculate' ){
                display.textContent = keyContent
            }else{    
                display.textContent = displayedNum + keyContent}
            calculator.dataset.previousKeyType = 'number'
        }   
        
        if (action === 'subtract'){
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            if(calculator.dataset.previousKeyType === 'operator'){
                let operator = calculator.dataset.previousKey
                display.textContent = keyContent
                if (firstValue && operator && secondValue){
                    const resValue = calculate(firstValue, operator, secondValue)
                    display.textContent = resValue
                } 
                
            calculator.dataset.previousKeyType = 'negative'
            
            }else{
                let operator = calculator.dataset.operator
                    if (firstValue && operator && calculator.dataset.previousKeyType !== 'operator' && calculator.dataset.previousKeyType !== 'calculate'){
                        const resValue = calculate(firstValue, operator, secondValue)
                        display.textContent = resValue
                        calculator.dataset.firstValue = resValue
                    }
                    else {
                        calculator.dataset.firstValue = displayedNum
                    }
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.operator = action
            }   
        }
        
        if ((action === 'add' || action === 'multiply') || action==='divide'){
            const firstValue = calculator.dataset.firstValue
            let operator = calculator.dataset.operator
            let secondValue;
            if (firstValue && operator && calculator.dataset.previousKeyType !== 'operator' 
            && calculator.dataset.previousKeyType !== 'negative' && calculator.dataset.previousKeyType !== 'calculate'){
                secondValue = displayedNum;
                const resValue = calculate(firstValue, operator, secondValue)
                display.textContent = resValue
                calculator.dataset.firstValue = resValue
                
            } 
            else if (calculator.dataset.previousKeyType !== 'negative'){
                secondValue = displayedNum;
                calculator.dataset.firstValue = displayedNum
            }
            
            if(calculator.dataset.previousKeyType === 'negative'){
                calculator.dataset.previousKeyType = ''
                operator = action;
            }
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }
        
        if (action === 'calculate'){ 
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            if(firstValue){
                if (calculator.dataset.previousKeyType==='calculate'){
                    firstValue  = displayedNum
                    secondValue = calculator.dataset.prevValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }    
            calculator.dataset.prevValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
        
        if (action === 'decimal') {
            if (!displayedNum.includes('.') && 
                calculator.dataset.previousKeyType!=='operator' && 
                calculator.dataset.previousKeyType!=='calculate') {
                    display.textContent = displayedNum + '.'}
                else if(calculator.dataset.previousKeyType==='operator' || 
                        calculator.dataset.previousKeyType==='calculate'){
                    display.textContent='0.'
                }
            calculator.dataset.previousKeyType = 'decimal'}
        
        if (action === 'clear') {
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
                calculator.dataset.prevValue = ''
                display.textContent = '0'
                calculator.dataset.previousKeyType==='clear'}
    }
})
