import React from "react";
import classNames from "classnames";
import styles from './styles.module.scss';

const UploadFile = ({ register, watch, errors, setError, clearErrors }) => {
  const err = errors?.['photo'] || errors?.['img'];

  React.useEffect(() => {
    clearErrors('img');
    const img = watch?.[0];
    const reader = new FileReader();
    if (img) {
      reader.readAsDataURL(img);
      reader.onload = function (e) {
        const image = new Image();

        image.src = e.target.result;
        image.onload = function () {
          const height = this.height;
          const width = this.width;

          if (height < 70 && width < 70) setError('img', { type: 'custom', message: "Image is invalid." });
        };
      };
    }

    if (img && img.size >= 5e+6) setError('img', { type: 'custom', message: "The photo may not be greater than 5 Mbytes." });
    if (img && !["image/jpeg", "image/jpg"].includes(img.type)) setError('img', { type: 'custom', message: "Image is invalid." });
    if (img) { clearErrors('upload') } else { setError('upload', { type: 'custom', message: "Image is invalid." }) };

  }, [watch, setError, clearErrors]);

  return <div className={classNames(styles.file, { [styles.input_error]: err })}>
    <input type="file" {...register('photo')} id='photo' name='photo' />
    <label htmlFor="photo" className={classNames(styles.file__btn,
      { [styles.input_error]: err },
      { [styles.file__btn_error]: err }
    )}
    >
      Upload
    </label>
    <span className={styles.file__placeholder}>
      {watch?.[0] && !err ? watch?.[0].name : 'Upload your photo'}
    </span>
    {
      err && <span className={classNames(styles.input__helper, styles.input__helper_red, styles.file__error)}>
        {err?.message}
      </span>
    }
  </div>
};

export default UploadFile;