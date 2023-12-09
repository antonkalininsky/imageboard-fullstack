class TextStylizer {
    constructor() {
        this.styleMap = [
            {
              id: 0,
              prompt: '***',
              style: 'font-bold italic'
            },
            {
              id: 1,
              prompt: '**',
              style: 'font-bold'
            },
            {
              id: 2,
              prompt: '*',
              style: 'italic'
            }
          ]
    }

    chopString(text, prompt) {
        const index = text.indexOf(prompt)
        const nextIndex = text.indexOf(prompt, index + prompt.length)
        if (index !== -1 && nextIndex !== -1) {
          const part1 = text.substring(0, index)
          const part2 = text.substring(index + prompt.length, nextIndex)
          const part3 = text.substring(nextIndex + prompt.length, text.length)
          return [part1, part2, part3]
        }
        return []
      }

    stylize(text, stage = 0) {
        if (stage >= this.styleMap.length) return text
        const choppedString = this.chopString(text, this.styleMap[stage].prompt)
        if (choppedString.length !== 3) return this.stylize(text, stage + 1)
        let ending = ''
        if (choppedString[2].length > 0) {
          ending = this.stylize(choppedString[2], stage)
        }
        return <>{this.stylize(choppedString[0], stage + 1)}<span className={this.styleMap[stage].style}>{choppedString[1]}</span>{ending}</>
      }
}

export default new TextStylizer