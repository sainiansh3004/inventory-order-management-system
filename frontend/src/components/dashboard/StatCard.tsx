import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
}: StatCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-slate-900
        border
        border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div
          className="
            p-4
            rounded-xl
            bg-blue-600/20
            border
            border-blue-500/20
          "
        >
          <Icon
            size={28}
            className="text-blue-400"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;