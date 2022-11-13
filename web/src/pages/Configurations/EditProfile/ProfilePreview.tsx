import { useContext } from "react";
import { UploadSimple } from "phosphor-react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";

import defaultAvatar from "../../../assets/floppa.png";
import { allowedMimes } from ".";

interface ProfilePreviewProps {
  avatarUrl: string | null, 
  artName: string | null,
  aboutMe: string, 
  setAvatarUrl: (url: string) => void,
  setNewImageAvatar: (image: File) => void,
}

export function ProfilePreview({ avatarUrl, artName, aboutMe, setAvatarUrl, setNewImageAvatar }: ProfilePreviewProps) {
  const { user } = useContext(AuthContext);

  function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const image = fileList[0];

    if (allowedMimes.includes(image.type)) {
      setNewImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[284px] h-fit bg-slate-50 rounded-md overflow-hidden">
      <div className="w-full h-28 bg-rose-400"/>

      <div className="h-32 w-32 -mt-16 rounded-full overflow-hidden">
        <label 
          className="group flex flex-col justify-center items-center relative h-32 w-32 rounded-md overflow-hidden cursor-pointer"
        >
          <UploadSimple 
            className="absolute p-1 bg-black bg-opacity-50 rounded-full group-hover:scale-150 group-hover:bg-opacity-100 transition-all"
            color='#FFF' 
            size={26} 
            weight="bold"
          />

          <img 
            className="h-44 w-44 object-cover"
            src={avatarUrl ? avatarUrl : defaultAvatar} 
            alt="Imagem de perfil do usuário" 
          />

          <input 
            className="hidden"
            type="file" 
            accept={allowedMimes.join(", ")}
            name="avatar" 
            onChange={handleChangeAvatar}
          />
        </label>
      </div>

      <div className="flex flex-col w-full px-6">
        <div className="flex flex-col w-full mt-4">
          <span className="text-lg font-medium">
            {artName || user?.name}
          </span>

          {
            artName && (
              <span>{user?.name}</span>
            )
          }
        </div>

        {
          aboutMe && (
            <div className="w-full mt-4 p-2 border-[1px] bg-slate-100 rounded-md">
              <div className="max-h-[140px] overflow-hidden">
                <p className="text-sm text-zinc-600">
                  {aboutMe}
                </p>
              </div>
            </div>
          )
        }

        <hr className="w-full mt-4 border-[1px]"/>

        <span className="w-full my-4 text-zinc-600 text-xs">
          Entrou em 10/2022
        </span>
      </div>
    </div>
  )
}