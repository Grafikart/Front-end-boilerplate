import Vue from 'vue'
import { Component, prop } from 'vue-property-decorator'

@Component({
    template: `
      <div>
        <h1>Hello {{ name }}</h1>
        <p>This component use {{ lang }} lol !</p>
      </div>`
})

export default class HelloWord extends Vue {

    @prop(String)
    name: String

    lang = 'typescript'

    greet () {
        console.log('Welcome' + this.name)
    }

}
