import io from './io.js';

export const commands = {
    help: {
        desc: 'lists all available commands and their use',
        action: (state, command) => {
            Object.keys(state.commands).forEach(key => {
                state = io.createElement(state, `\`${key}\` - ${state.commands[key].desc}`);
            })
            state = io.createInput(state);
            return state;
        }
    },
    echo: {
        desc: 'prints something to the terminal',
        action: (state, command) => {
            
        }
    }
};