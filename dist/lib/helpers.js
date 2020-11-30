export const createId = () => {
    const id = [...Array(20)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
    return id;
};
