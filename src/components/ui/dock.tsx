"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";

import { cn } from "../../lib/utils";

export interface DockItem {
  icon: React.ReactNode;
  label: string;
  /** if provided, item renders as an `<a>` */
  href?: string;
  onClick?: () => void;
  /** renders a visual separator after this item */
  separator?: boolean;
}

export interface DockProps {
  items: DockItem[];
  /** @default 1.8 */
  magnification?: number;
  /** cursor radius (px) within which neighbors are magnified — @default 120 */
  distance?: number;
  /** @default 40 */
  iconSize?: number;
  /** @default 4 */
  gap?: number;
  /** @default 16 */
  borderRadius?: number;
  /** show labels permanently instead of on hover — @default false */
  alwaysShowLabels?: boolean;
  springOptions?: SpringOptions;
  className?: string;
}

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

function DockSeparator() {
  return (
    <div className="mx-1 flex items-center self-stretch">
      <div className="h-6 w-px bg-white/10" />
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  magnification,
  distance,
  iconSize,
  borderRadius,
  alwaysShowLabels,
  springOptions,
  onHover,
  iconRef: externalIconRef,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  iconSize: number;
  borderRadius: number;
  alwaysShowLabels: boolean;
  springOptions: SpringOptions;
  onHover: (ref: React.RefObject<HTMLDivElement | null> | null) => void;
  iconRef: React.RefObject<HTMLDivElement | null>;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const el = wrapperRef.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d: number) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const widthRaw = useTransform(
    distanceFromMouse,
    (d) => iconSize * gaussian(d),
  );
  const heightRaw = useTransform(
    distanceFromMouse,
    (d) => iconSize * gaussian(d),
  );

  const width = useSpring(widthRaw, springOptions);
  const height = useSpring(heightRaw, springOptions);

  const Tag = item.href ? "a" : "button";

  return (
    // fixed height in-flow; width animates to push neighbors
    <motion.div
      ref={wrapperRef}
      className="relative flex items-end justify-center"
      style={{ width, height: iconSize }}
    >
      {/* absolute, anchored bottom so icon grows upward */}
      <motion.div
        ref={externalIconRef}
        style={{ width, height, bottom: 0 }}
        className="absolute"
      >
        <Tag
          href={item.href}
          onClick={item.onClick}
          onMouseEnter={() => onHover(externalIconRef)}
          onMouseLeave={() => onHover(null)}
          aria-label={item.label}
          style={{ borderRadius }}
          className={cn(
            "flex h-full w-full items-center justify-center pointer-events-auto",
            "text-white/70 transition-colors duration-150",
            "hover:bg-white/10 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20",
            "[&_svg]:size-[55%]"
          )}
        >
          {item.icon}
        </Tag>
      </motion.div>

      {alwaysShowLabels && (
        <span className="mt-0.5 text-[10px] font-medium tracking-tight text-white/40 whitespace-nowrap pointer-events-none select-none leading-none">
          {item.label}
        </span>
      )}
    </motion.div>
  );
}

export function Dock({
  items,
  magnification = 1.8,
  distance = 120,
  iconSize = 40,
  gap = 4,
  borderRadius = 16,
  alwaysShowLabels = false,
  springOptions = DEFAULT_SPRING,
  className,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const dockRef = React.useRef<HTMLDivElement>(null);

  const [iconRefs] = React.useState(() =>
    items.map(() => React.createRef<HTMLDivElement>())
  );

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipX, setTooltipX] = React.useState(0);

  React.useEffect(() => {
    if (hoveredIndex === null) return;

    let raf: number;
    const update = () => {
      const iconEl = iconRefs[hoveredIndex]?.current;
      const dockEl = dockRef.current;
      if (iconEl && dockEl) {
        const iconRect = iconEl.getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();
        setTooltipX(iconRect.left - dockRect.left + iconRect.width / 2);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [hoveredIndex, iconRefs]);

  const handleHover = React.useCallback(
    (ref: React.RefObject<HTMLDivElement | null> | null) => {
      if (ref === null) {
        setHoveredIndex(null);
        return;
      }
      const idx = iconRefs.findIndex((r) => r === ref);
      setHoveredIndex(idx >= 0 ? idx : null);
    },
    [iconRefs],
  );

  return (
    <motion.div
      ref={dockRef}
      className={cn(
        "relative flex items-end overflow-visible border border-white/10 bg-black/50 px-2 py-2 shadow-none hover:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.6)] transition-shadow duration-200 backdrop-blur-xl pointer-events-auto",
        className,
      )}
      style={{ gap, borderRadius }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <DockIcon
            item={item}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
            iconSize={iconSize}
            borderRadius={borderRadius}
            alwaysShowLabels={alwaysShowLabels}
            springOptions={springOptions}
            onHover={handleHover}
            iconRef={iconRefs[i]}
          />
          {item.separator && <DockSeparator />}
        </React.Fragment>
      ))}

      {!alwaysShowLabels && (
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key="dock-tooltip"
              layoutId="dock-tooltip"
              className="pointer-events-none absolute flex flex-col items-center z-50"
              style={{
                left: tooltipX,
                top: "calc(100% + 12px)",
                x: "-50%",
              }}
              initial={{ opacity: 0, y: -6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              transition={{ duration: 0.13, ease: "easeOut" }}
            >
              <span className="rounded-md border border-white/10 bg-[#141414] px-3 py-1.5 text-xs font-medium text-white shadow-xl whitespace-nowrap">
                {items[hoveredIndex].label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
