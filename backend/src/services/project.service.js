
import Project from "../models/Project.js";

export const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

export const getAllProjects = async () => {
  const projects = await Project.find()
    .populate("owner", "name email")
    .sort({ createdAt: -1 });
  return projects;
};

export const getProjectById = async (id) => {
  const project = await Project.findById(id)
    .populate("owner", "name email")
    .populate("members", "name email");

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

export const updateProject = async (id, userId, data) => {
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  if (project.owner.toString() !== userId.toString()) {
    const error = new Error("Not authorized to update this project");
    error.statusCode = 403;
    throw error;
  }

  const updated = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

export const deleteProject = async (id, userId) => {
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  if (project.owner.toString() !== userId.toString()) {
    const error = new Error("Not authorized to delete this project");
    error.statusCode = 403;
    throw error;
  }

  await project.deleteOne();
};