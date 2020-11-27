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
    },
    default: {
        desc: 'runs if no matching command is found',
        action: (state, command) => {
            state = io.createElement(state, `\`${command}\` is not recognised as a valid command`);
            return io.createInput(state);
        }
    }
};