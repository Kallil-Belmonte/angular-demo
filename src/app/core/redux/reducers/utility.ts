const updateState = (oldState: any, updatedProperties: any) => {
  return {
    ...oldState,
    ...updatedProperties
  };
};

export default updateState;
