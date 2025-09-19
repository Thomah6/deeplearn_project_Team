// src/data/badges.js

/**
 * Contexte utilisateur pour l'évaluation des badges.
 * @typedef {Object} UserContext
 * @property {Array} completedCourses - Liste des objets cours complets.
 * @property {Object} user - L'objet utilisateur complet.
 */

export const allBadges = [
  {
    id: 'beginner',
    icon: '🎓',
    label: 'Débutant',
    color: 'bg-green-200',
    description: 'Terminer votre premier cours.',
    /** @param {UserContext} context */
    condition: ({ completedCourses }) => completedCourses.length >= 1,
  },
  {
    id: 'intermediate',
    icon: '🔥',
    label: 'Intermédiaire',
    color: 'bg-orange-200',
    description: 'Terminer 3 cours.',
    /** @param {UserContext} context */
    condition: ({ completedCourses }) => completedCourses.length >= 3,
  },
  {
    id: 'expert',
    icon: '🏆',
    label: 'Expert',
    color: 'bg-yellow-200',
    description: 'Terminer 5 cours.',
    /** @param {UserContext} context */
    condition: ({ completedCourses }) => completedCourses.length >= 5,
  },

  {
    id: 'python_initiate',
    icon: '🐍',
    label: 'Initié Python',
    color: 'bg-blue-200',
    description: "Terminer le cours 'Introduction à Python'.",
    /** @param {UserContext} context */
    condition: ({ completedCourses }) =>
      completedCourses.some((course) => course.id === 1), // ID du cours Python
  },
  {
    id: 'it_specialist',
    icon: '💻',
    label: 'Spécialiste IT',
    color: 'bg-indigo-200',
    description: "Terminer 3 cours dans la catégorie 'Software engineering & IT'.",
    /** @param {UserContext} context */
    condition: ({ completedCourses }) => {
      const itCourses = completedCourses.filter(
        (course) => course.category === 'Software engineering & IT',
      )
      return itCourses.length >= 3
    },
  },
  {
    id: 'advanced_learner',
    icon: '🚀',
    label: 'Savoir Avancé',
    color: 'bg-red-200',
    description: "Terminer un cours de niveau 'Avancé'.",
    /** @param {UserContext} context */
    condition: ({ completedCourses }) =>
      completedCourses.some((course) => course.level === 'Avancé'),
  },
]

/**
 * Calcule les badges obtenus par un utilisateur en fonction de ses cours terminés.
 * @param {UserContext} context - Le contexte utilisateur contenant les données nécessaires.
 * @returns {Array} - La liste des badges que l'utilisateur a gagnés.
 */
export function getEarnedBadges(context) {
  if (!context || !context.completedCourses || context.completedCourses.length === 0) {
    return []
  }
  return allBadges.filter((badge) => badge.condition(context))
}
