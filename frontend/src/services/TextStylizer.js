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

  addingInlineStyling(text, character, coordinates) {
    if (coordinates.start === coordinates.end) return text
    const part1 = text.slice(0, coordinates.start)
    const part2 = text.slice(coordinates.start, coordinates.end)
    const part3 = text.slice(coordinates.end)
    return part1 + character + part2 + character + part3
  }

  addingLineStyling(text, character, coordinates) {
    const targetIndex = coordinates.start
    let prevBreakIndex = -1
    let breakIndex = 0
    let safeCount = 0
    while (true) {
        safeCount++
        breakIndex = text.indexOf('\n', prevBreakIndex + 1)
        if (breakIndex >= targetIndex || breakIndex === -1) {
            break
        } else {
            prevBreakIndex = breakIndex
        }
        if (safeCount > text.length) break
    }
    if (prevBreakIndex === -1) {
      return character + ' ' + text
    } 
    const part1 = text.slice(0, prevBreakIndex + 1)
    const part2 = text.slice(prevBreakIndex + 1)
    return part1 + character + ' ' + part2
  }

  addingStylingCharacters(text, character, coordinates) {
    if (character === '*' || character === '**') {
      return this.addingInlineStyling(text, character, coordinates)
    } else if (character === '>' || character === '#') {
      return this.addingLineStyling(text, character, coordinates)
    } else {
      return text
    }

  }
}

export default new TextStylizer()