class TextStylizer {
  constructor() {
    this.styleMap = [
      {
        prompt: '***',
        style: 'font-bold italic'
      },
      {
        prompt: '**',
        style: 'font-bold'
      },
      {
        prompt: '*',
        style: 'italic'
      }
    ]

    this.styleLine = [
      {
        prompt: '> ',
        style: 'text-green'
      },
      {
        prompt: '# ',
        style: 'font-bold text-lg'
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

  stylizeLine(text) {
    let result
    const linesList = text.split('\n')
    linesList.forEach((line) => {
      let isLineStylized = false
      this.styleLine.some((styleItem) => {
        if (new RegExp(`^${styleItem.prompt}`).test(line)) {
          result = <>{result}<p className={styleItem.style}>{line}</p></>
          isLineStylized = true
          return true
        }
        return false
      })
      if (!isLineStylized) {
        result = <>{result}<p>{this.stylize(line)}</p></>
      }
    })
    return result
  }
}

export default new TextStylizer