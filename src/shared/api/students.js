const students = (r) => {
  return {
    create: (data) => {
      return r('/students/', {method: 'post', data});
    }
  }
};

export default students;