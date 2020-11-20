const io = {
    render: (state) => {
        state.root.innerHTML = '';
        for (let e of state.output) {
            state.root.appendChild(e);
        }
        return state;
    },
    createElement: (state, string) => {
        const e = document.createElement('p');
        e.innerHTML = string;
        state.output.push(e);
        return io.render(state);
    },
    createInput: state => {
        const div = document.createElement('div');
        div.style.display = 'grid';
        div.style.gridTemplateColumns = 'max-content 1fr';
        const e = document.createElement('p');
        const j = document.createElement('p');
        
        e.innerHTML = `${state.path[state.path.length - 1]} > `;
        j.contentEditable = true;

        div.appendChild(e);
        div.appendChild(j);

        state.output.push(div);
        return io.render(state);
    }
};

export default io;