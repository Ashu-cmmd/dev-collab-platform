import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/project.service.js";

export const create = async (req, res, next) => {
  try {
    const { title, description, techStack, openRoles } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await createProject({
      title,
      description,
      techStack,
      openRoles,
      owner: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const project = await updateProject(req.params.id, req.user._id, req.body);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteProject(req.params.id, req.user._id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};