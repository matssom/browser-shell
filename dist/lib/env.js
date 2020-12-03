import { storable } from 'storable-state';
class env {
    constructor() {
        this.user = 'system';
        this.group = 'system';
        env.store.update(value => {
            if (!value) {
                return {
                    user: this.user,
                    group: this.group
                };
            }
            else
                return value;
        });
    }
    static getInstance() {
        return this._instance || (this._instance = new this());
    }
}
env.store = storable('env');
const setter = {
    set: (obj, prop, value) => {
        env.store.update(state => {
            const updated = Object.assign({}, state);
            updated[prop] = value;
            return updated;
        });
        obj[prop] = value;
        return true;
    }
};
export default new Proxy(env.getInstance(), setter);
