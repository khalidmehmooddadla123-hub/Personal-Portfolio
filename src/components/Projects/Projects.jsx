
import { useState, useEffect } from "react";
import { Lock, Sparkles, Loader2 } from "lucide-react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { toast } from "../../utils/toast";
import { getProjectImage } from "../../data";
import SectionLabel from "../ui/SectionLabel";
import ProjectCard from "./ProjectCard";
import PasswordModal from "./PasswordModal";
import AddProjectModal from "./AddProjectModal";
import { supabase } from "../../lib/supabaseClient";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPW, setShowPW] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { dark } = useDarkModeContext();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("Fetched Projects:", data);
      setProjects(data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Failed to load projects.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (project) => {
    try {
      const cleanProject = {
        title: project.title,
        description: project.description,
        tech: Array.isArray(project.tech)
          ? project.tech
          : project.tech.split(",").map((t) => t.trim()).filter(Boolean),
        emoji: project.emoji,
        color: project.color,
        liveLink: project.liveLink || null,
        githubLink: project.githubLink || null,
        imageUrl: project.imageUrl || getProjectImage(project.title),
      };

      const { data, error } = await supabase
        .from("projects")
        .insert([cleanProject])
        .select()
        .single();

      if (error) throw error;

      setProjects((prev) => [data, ...prev]);
      toast.success("Project added successfully 🎉");
    } catch (err) {
      console.error("Add failed:", err);
      toast.error("Failed to add project.");
    }
  };

  const handleEdit = async (project) => {
    try {
      const { id, ...updates } = project;
      const cleanUpdates = {
        ...updates,
        tech: Array.isArray(updates.tech)
          ? updates.tech
          : updates.tech.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const { data, error } = await supabase
        .from("projects")
        .update(cleanUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setProjects((prev) => prev.map((p) => (p.id === id ? data : p)));
      toast.success("Project updated ✅");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update project.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted 🗑️");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete project.");
    }
  };

  const handleAdminClick = () =>
    isAdmin ? setShowAdd(true) : setShowPW(true);
  const handlePWOK = () => {
    setIsAdmin(true);
    setShowPW(false);
    setShowAdd(true);
  };
  const openEdit = (project) => {
    setEditProject(project);
    setShowAdd(true);
  };
  const handleModalClose = () => {
    setShowAdd(false);
    setEditProject(null);
  };
  const handleModalSave = (project) => {
    editProject
      ? handleEdit({ ...project, id: editProject.id })
      : handleAdd(project);
    handleModalClose();
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: dark ? "#06051a" : "#f8fafc" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center mb-12">
          <SectionLabel
            tag="My Work"
            title="Featured"
            accent="Projects"
            sub="Real-world applications built with the modern React ecosystem."
          />
          <button
            onClick={handleAdminClick}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all hover:scale-105 ${
              isAdmin
                ? "bg-linear-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                : dark
                ? "border border-white/10 text-slate-300 hover:bg-white/5"
                : "border border-gray-200 text-gray-600 bg-white"
            }`}
          >
            {isAdmin ? (
              <>
                <Sparkles className="w-4 h-4" />
                Add New Project
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Add Project (Admin)
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-fuchsia-500" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={openEdit}
                dark={dark}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>

      {showPW && (
        <PasswordModal
          onSuccess={handlePWOK}
          onClose={() => setShowPW(false)}
        />
      )}
      {showAdd && (
        <AddProjectModal
          onAdd={handleModalSave}
          onClose={handleModalClose}
          editProject={editProject}
        />
      )}
    </section>
  );
}