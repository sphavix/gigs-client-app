import { makeAutoObservable } from "mobx";

export default class GigStore {
    title = 'Hello from Mobx';


    constructor(){
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}