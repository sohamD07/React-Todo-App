function timeAgo(timestamp) {
  const now = Date.now(); // current time in ms
  const diff = Math.floor((now - timestamp) / 1000); // difference in seconds

  if (diff < 60) {
    return `${diff} sec ago`;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export { timeAgo };

