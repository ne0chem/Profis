/**
 * Когда появится бэкенд — просто подставьте базовый URL.
 * Пример: "https://api.example.com/projects"
 * Запрос: GET `${PROJECTS_API_URL}/${projectId}`
 *
 * Ожидаемый JSON (можно расширять):
 * {
 *   id, number, title, type, location, year, image, tags,
 *   summary, works?
 * }
 */
export const PROJECTS_API_URL = "";

export async function fetchProjectDetails(projectId) {
  if (!PROJECTS_API_URL) {
    return null;
  }

  const response = await fetch(`${PROJECTS_API_URL}/${projectId}`);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить проект (${response.status})`);
  }

  return response.json();
}
