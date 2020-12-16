import { storable } from 'storable-state'

class env {
    private static _instance: env
    public static store = storable('env')
    public user : string = 'system'
    public group : string = 'admin'

    private constructor() {

        env.store.update(value => {
            if (!value) {
                return {
                    user: this.user,
                    group: this.group
                }
            }
            else return value
        })
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }

}

const setter = {
    set: (obj, prop, value) => {
        env.store.update(state => {
            const updated = {...state}
            updated[prop] = value
            return updated
        })
        obj[prop] = value
        return true
    }
}

export default new Proxy(env.getInstance(), setter)