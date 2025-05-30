import { useEffect } from 'react'

// Updates the height of a <textarea> when the value changes.
export function useAutosizeTextArea(
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px'
      const scrollHeight = textAreaRef.scrollHeight
      textAreaRef.style.height = scrollHeight + 'px'
    }
  }, [value, textAreaRef])
}
