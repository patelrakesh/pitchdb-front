export default {
  formatDuration: (duration) => {
    if (duration) {
      const colonAmount = (duration.match(/:/g) || []).length;
      if (colonAmount === 0) {
        let durationInMinutes = Number(duration) / 60;
        let hours = Math.floor(durationInMinutes / 60);
        let minutes = Math.floor(durationInMinutes % 60);
        let seconds = Number(duration) - ((hours * 3600) + (minutes * 60));
        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') +
          ":" + seconds.toString().padStart(2, '0');
      }
      else if (colonAmount === 1) {
        return "00:" + duration;
      }
    }
    return duration;
  }
};