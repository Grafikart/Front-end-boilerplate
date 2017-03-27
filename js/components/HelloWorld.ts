import Vue from 'vue'
import { Component, prop } from 'vue-property-decorator'

@Component({
  template: `
    <div>
      <h1>Hello {{ name }} how are you </h1>
      <p @click="greet">This componentes use {{ lang }} !</p>
    </div>`
})

export default class HelloWord extends Vue {

  @prop(String) name: string

  lang = 'typescript'

  greet () {
    console.log('Welcome' + this.name)
  }

}
