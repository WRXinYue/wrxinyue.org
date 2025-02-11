import gsap from 'gsap'

export function wrapTextWithSpan(selector: string): HTMLElement[] {
  const element = document.querySelector(selector)
  if (!element)
    return []

  element.innerHTML = element.textContent
    ?.split('')
    .map(char => `<span class="char">${char}</span>`)
    .join('') || ''

  return gsap.utils.toArray(`${selector} span`)
}
