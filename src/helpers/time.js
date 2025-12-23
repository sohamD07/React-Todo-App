/**
 * Formats a timestamp into a human-readable "time ago" string
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted time ago string
 */
export function timeAgo(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') {
    return 'Unknown';
  }

  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);

  if (diff < 0) return 'Just now'; // Future dates

  if (diff < 60) {
    return diff === 0 ? 'Just now' : `${diff} sec ago`;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}