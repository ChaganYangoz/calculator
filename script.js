class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousTextElement=previousTextElement;
        this.currentTextElement=currentTextElement;
        this.clearAll();
    }

    clearAll(){
        this.currentOperand='';
        this.previousOperand='';
        this.operand=undefined;
        this.update();
    }

    delete(){
        let del;
        if(this.currentOperand!=''){
            del=this.currentOperand;
            del=del.substring(0,del.length-1);
            this.currentOperand=del;
            this.update();
        }
        else if(this.operand!=undefined){
            this.operand=undefined;
            this.update();
        }
        else{
            del=this.previousOperand;
        }

    }

    appendNumber(number){
        if(number=='.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand=this.currentOperand.toString()+number;
    }

    chooseOperand(operand){
        if(this.operand!=undefined){
            return;
        }
        this.operand=operand;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }

    update(){
        this.currentTextElement.innerText=this.currentOperand;
        this.previousTextElement.innerText=this.previousOperand;
    }

    compute(){
        switch(this.operand){
            case '+':this.currentOperand=(parseInt(this.currentOperand)+parseInt(this.previousOperand)).toString();
            break;
            case 'x':this.currentOperand=(parseInt(this.currentOperand)*parseInt(this.previousOperand)).toString();
            break;
            case '-':this.currentOperand=(parseInt(this.previousOperand)-parseInt(this.currentOperand)).toString();
            break;
            case '÷':this.currentOperand=(parseInt(this.previousOperand)/parseInt(this.currentOperand)).toString();
            break;
            case '%':this.currentOperand=(parseInt(this.previousOperand)%parseInt(this.currentOperand)).toString();
        }
        this.previousOperand='';
        this.operand=undefined;
        this.update();
    }
}

const ac=document.querySelector('.allclear');
const clear=document.querySelector('.clear');
const digits=document.querySelectorAll('.digit');
const operators=document.querySelectorAll('.op');
const previousTextElement=document.querySelector('.previous');
const currentTextElement=document.querySelector('.current');
const equal=document.querySelector('#equal');


const calculator=new Calculator(previousTextElement,currentTextElement);
calculator.clearAll();

digits.forEach(digit=>{
    digit.addEventListener('click',()=>{
        calculator.appendNumber(digit.innerText);
        calculator.update();
    })
    digit.addEventListener('keyup',(e)=>{
        if(e.code==='9'){
        calculator.appendNumber('9');
        calculator.update();

        }
    })
});


operators.forEach(operator=>{
    operator.addEventListener('click',()=>{
        calculator.chooseOperand(operator.innerText);
        calculator.update();
    })
});

equal.addEventListener('click',()=>{
    calculator.compute();
    calculator.update();
});

ac.addEventListener('click',()=>{
    calculator.clearAll();
});

clear.addEventListener('click',()=>{
    calculator.delete();
})