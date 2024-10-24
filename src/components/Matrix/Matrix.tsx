import 'src/components/Matrix/Matrix.scss';
import { MATRIX_DATA, maxValue, minValue } from 'src/services/const';
import { formatEmployeeName } from 'src/services/helpers';
import { EmployeeType } from 'src/services/types';
import { Icon } from 'src/shared/ui/Icon/Icon';
import InfoTooltipMatrix from 'src/shared/ui/InfoTooltipMatrixHigh/InfoTooltipMatrixHigh';
import InfoTooltipMatrixLow from 'src/shared/ui/InfoTooltipMatrixLow/InfoTooltipMatrixLow';
import InfoTooltipMatrixMiddle from 'src/shared/ui/InfoTooltipMatrixMiddle/InfoTooltipMatrixMiddle';
import Subtitile from 'src/shared/ui/Subtitle/Subtitle';
import {
  selectEmployees,
  setTooltip,
} from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export const Matrix = () => {
  const { employees, tooltip, member } = useAppSelector(selectEmployees);
  const memberArray = member.id ? [member] : [];
  const dispatch = useAppDispatch();

  const handleMouseEnter = (index: number) => {
    dispatch(setTooltip(index));
  };

  const handleMouseLeave = () => {
    dispatch(setTooltip(null));
  };

  // Рендерим список сотрудников в зависимости от их уровня навыков и вовлеченности
  const renderEmployeeList = (employees: EmployeeType[], flag: number) => {
    return employees.map((employee) => {
      const { assesmentLevel, involvmentLevel } = employee.assesmentOfPotention;
      if (involvmentLevel === null) {
        return null;
      }
      let renderLi = false;
      if (flag === 1) {
        renderLi = assesmentLevel < minValue && involvmentLevel > maxValue;
      } else if (flag === 2) {
        renderLi =
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel > maxValue;
      } else if (flag === 3) {
        renderLi = assesmentLevel > maxValue && involvmentLevel > maxValue;
      } else if (flag === 4) {
        renderLi =
          assesmentLevel < minValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue;
      } else if (flag === 5) {
        renderLi =
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue;
      } else if (flag === 6) {
        renderLi =
          assesmentLevel > maxValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue;
      } else if (flag === 7) {
        renderLi = assesmentLevel < minValue && involvmentLevel < minValue;
      } else if (flag === 8) {
        renderLi =
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel < minValue;
      } else if (flag === 9) {
        renderLi = assesmentLevel > maxValue && involvmentLevel < minValue;
      }
      if (renderLi) {
        return (
          <li key={employee.id} className='matrix__cell_item'>
            {member.id
              ? formatEmployeeName(member.worker)
              : formatEmployeeName(employee.worker)}
          </li>
        );
      }
      return null;
    });
  };

  // Проверяем в зависимости от их уровня навыков и вовлеченности подходят ли они
  const allEmployeesAssessed = (employees: EmployeeType[], flag: number) => {
    return employees.every((employee) => {
      const { assesmentLevel, involvmentLevel } = employee.assesmentOfPotention;
      let assessed = true;
      if (involvmentLevel === null) {
        return null;
      }
      if (flag === 1) {
        assessed = !(assesmentLevel < minValue && involvmentLevel > maxValue);
      } else if (flag === 2) {
        assessed = !(
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel > maxValue
        );
      } else if (flag === 3) {
        assessed = !(assesmentLevel > maxValue && involvmentLevel > maxValue);
      } else if (flag === 4) {
        assessed = !(
          assesmentLevel < minValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue
        );
      } else if (flag === 5) {
        assessed = !(
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue
        );
      } else if (flag === 6) {
        assessed = !(
          assesmentLevel > maxValue &&
          involvmentLevel > minValue &&
          involvmentLevel < maxValue
        );
      } else if (flag === 7) {
        assessed = !(assesmentLevel < minValue && involvmentLevel < minValue);
      } else if (flag === 8) {
        assessed = !(
          assesmentLevel > minValue &&
          assesmentLevel < maxValue &&
          involvmentLevel < minValue
        );
      } else if (flag === 9) {
        assessed = !(assesmentLevel > maxValue && involvmentLevel < minValue);
      }

      return assessed;
    });
  };

  return (
    <section className='matrix'>
      <Subtitile text='Матрица оценки потенциала сотрудников' />
      <div className='matrix__container'>
        <div className='matrix__row'>
          <div className='matrix__high_label-vertical'>
            <div className='matrix__label_vertiacal'>высокая</div>
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 1)
                : renderEmployeeList(employees, 1)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 1) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.mentor}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 0 && <InfoTooltipMatrix text={MATRIX_DATA.mentor} />}
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 2)
                : renderEmployeeList(employees, 2)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 2) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.iniciative}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 1 && (
              <InfoTooltipMatrix text={MATRIX_DATA.iniciative} />
            )}
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 3)
                : renderEmployeeList(employees, 3)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 3) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.careare}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 2 && <InfoTooltipMatrix text={MATRIX_DATA.careare} />}
          </div>
        </div>
        <div className='matrix__row'>
          <div className='matrix__middle_label-vertical'>
            <div className='matrix__label_vertiacal'>средняя</div>
            <p className='matrix__label_engagement'>Вовлеченность</p>
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 4)
                : renderEmployeeList(employees, 4)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 4) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.task}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 3 && (
              <InfoTooltipMatrixMiddle text={MATRIX_DATA.task} />
            )}
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 5)
                : renderEmployeeList(employees, 5)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 5) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.education}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 4 && (
              <InfoTooltipMatrixMiddle text={MATRIX_DATA.education} />
            )}
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 6)
                : renderEmployeeList(employees, 6)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 6) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.project}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 5 && (
              <InfoTooltipMatrixMiddle text={MATRIX_DATA.project} />
            )}
          </div>
        </div>
        <div className='matrix__row'>
          <div className='matrix__row_label-vertical'>
            <div className='matrix__label_vertiacal'>низкая</div>
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 7)
                : renderEmployeeList(employees, 7)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 7) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.editTask}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 6 && (
              <InfoTooltipMatrixLow text={MATRIX_DATA.editTask} />
            )}
          </div>
          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 8)
                : renderEmployeeList(employees, 8)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 8) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.learning}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 7 && (
              <InfoTooltipMatrixLow text={MATRIX_DATA.learning} />
            )}
          </div>

          <div className='matrix__cell'>
            <ul className='matrix__cell_list'>
              {member.id
                ? renderEmployeeList(memberArray, 9)
                : renderEmployeeList(employees, 9)}
            </ul>
            {allEmployeesAssessed(member.id ? memberArray : employees, 9) ? (
              <p className='matrix__cell_text'>{MATRIX_DATA.engagement}</p>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon id='help' className='svg__help' />
              </div>
            )}
            {tooltip === 8 && (
              <InfoTooltipMatrixLow text={MATRIX_DATA.engagement} />
            )}
          </div>
        </div>
        <div className='matrix__row'>
          <div className='matrix__row_label-horizontal'>
            <p className='matrix__label_horizontal'>низкая</p>
          </div>
          <div className='matrix__middle-label-horizontal'>
            <p className='matrix__label_horizontal'>средняя</p>
          </div>
          <div className='matrix__high-label-horizontal'>
            <p className='matrix__label_horizontal'>высокая</p>
          </div>
        </div>
        <div className='matrix__row_skills'>Оценка навыков</div>
      </div>
    </section>
  );
};
