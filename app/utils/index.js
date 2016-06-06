export function scaleValue(range, domain, value) {
  let percent = (value - range[0]) / (range[1] - range[0]),
      domainMin = domain[0],
      domainMax = domain[1]

  return percent * (domainMax - domainMin) + domainMin
}
