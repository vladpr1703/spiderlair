export const joinClasses = (
    ...classNameDefs: Array<string | [string, SecondTupleElement]>
  ) => {
    const classNames = classNameDefs.reduce(
      (
        classNamesAcc: string[],
        classNameDef: string | [string, SecondTupleElement]
      ) => {
        if (Array.isArray(classNameDef)) {
          const [className, shouldAdd] = classNameDef
          if (className && shouldAdd) {
            classNamesAcc.push(className)
          }
        } else if (classNameDef) {
          classNamesAcc.push(classNameDef)
        }
        return classNamesAcc
      },
      []
    )
    return classNames.join(' ') || undefined
  }
  
  type SecondTupleElement = string | boolean | VoidFunction | undefined