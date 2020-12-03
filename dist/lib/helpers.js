export const createId = () => {
    const id = [...Array(20)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
    return id;
};
export const validateArgs = (args, message) => {
    for (let arg of Object.keys(args)) {
        if (!args[arg])
            throw new Error(`\`${arg}\` ${message}`);
    }
};
