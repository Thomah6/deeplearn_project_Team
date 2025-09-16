// src/data/badges.js

// Définition de tous les badges disponibles dans l'application
export const allBadges = [
  {
    id: 'beginner',
    icon: '🎓',
    label: 'Débutant',
    color: 'bg-green-200',
    description: 'Terminer 1 cours',
    // La condition pour obtenir ce badge
    condition: (completedCourses) => completedCourses.length >= 1,
  },
  {
    id: 'intermediate',
    icon: '🔥',
    label: 'Intermédiaire',
    color: 'bg-orange-200',
    description: 'Terminer 3 cours',
    condition: (completedCourses) => completedCourses.length >= 3,
  },
  {
    id: 'expert',
    icon: '🏆',
    label: 'Expert',
    color: 'bg-yellow-200',
    description: 'Terminer 5 cours',
    condition: (completedCourses) => completedCourses.length >= 5,
  },
]

/**
 * Calcule les badges obtenus par un utilisateur en fonction de ses cours terminés.
 * @param {Array} completedCourses - La liste des objets cours terminés par l'utilisateur.
 * @returns {Array} - La liste des badges que l'utilisateur a gagnés.
 */
export function getEarnedBadges(completedCourses) {
  if (!completedCourses || completedCourses.length === 0) {
    return []
  }
  return allBadges.filter((badge) => badge.condition(completedCourses))
}
