import inquirer from 'inquirer';
import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'opt',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const confirmText = [
    {
        type: 'input',
        name: 'confirm',
        message: `Presione ${'ENTER'.green} para continuar`

    }  
];

const inputText = [
    {
        type: 'input',
        name: 'desc',
        message: '',
        validate(value){

            if (!value) return 'Por favor ingrese un valor';
            return true;
        }
    }
]

const inquirerMenu = async() =>{

    console.clear();
    console.log("===========================".green);
    console.log("   Seleccione una opción")
    console.log("===========================\n".green);

    const {opt} = await inquirer.prompt(menuOpts);

    return opt;
}

const pausa = async() => {
    console.log('\n');
    await inquirer.prompt(confirmText);

}

const leerInput = async(message) =>{

    const inputText = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
    
                if (!value) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(inputText);//respuesta

    return desc;


}

const listarLugares = async(lugares = []) =>{

    const choices = lugares.map((lugar, idx)=>{
        const index = idx+1;
  
        return {
            value:lugar.id,
            name: `${(index+'.').green} ${lugar.nombre}`
        }
    });

    choices.push({
        value: 0,
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la ubicación',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    

    return id;
   
}

const confirmar = async(message) =>{
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok;
}


export{
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar
}