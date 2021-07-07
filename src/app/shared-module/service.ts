export function enumToArray(enumValue: any) {
    let arrayObjects = [];
    for (const [propertyKey, propertyValue] of Object.entries(enumValue)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    return arrayObjects;
  }

export function changeDropDown(e, component) {
    component.setValue(e.target.value, {
      onlySelf: true,
    });
  }